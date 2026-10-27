const MAX_CART_QUANTITY = 99;

export function getCartOwnerId() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return localStorage.getItem('token') && user?.id ? String(user.id) : null;
  } catch {
    return null;
  }
}

function cartKey(ownerId) {
  return ownerId ? `cartItems:${ownerId}` : 'cartItems';
}

function membershipKey(ownerId) {
  return ownerId ? `membershipSelection:${ownerId}` : 'membershipSelection';
}

export function readMembershipSelection(ownerId = getCartOwnerId()) {
  const selection = localStorage.getItem(membershipKey(ownerId));
  return ['silver', 'gold', 'platinum'].includes(selection) ? selection : '';
}

export function writeMembershipSelection(selection, ownerId = getCartOwnerId()) {
  if (['silver', 'gold', 'platinum'].includes(selection)) {
    localStorage.setItem(membershipKey(ownerId), selection);
  } else {
    localStorage.removeItem(membershipKey(ownerId));
  }
  window.dispatchEvent(new Event('membershipUpdated'));
}

export function moveMembershipSelection(fromOwnerId, toOwnerId) {
  if (fromOwnerId === toOwnerId) return readMembershipSelection(toOwnerId);
  const source = readMembershipSelection(fromOwnerId);
  const destination = readMembershipSelection(toOwnerId);
  if (!source || destination) return destination;
  writeMembershipSelection(source, toOwnerId);
  writeMembershipSelection('', fromOwnerId);
  return source;
}

export function clearGuestCart() {
  clearCart(null);
  writeMembershipSelection('', null);
}

export function readCart(ownerId = getCartOwnerId()) {
  try {
    const parsed = JSON.parse(localStorage.getItem(cartKey(ownerId)) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item === 'object' && typeof item.name === 'string')
      .map((item) => ({
        ...item,
        quantity: Number.isInteger(Number(item.quantity))
          ? Math.min(MAX_CART_QUANTITY, Math.max(1, Number(item.quantity)))
          : 1,
      }));
  } catch {
    console.error('Unable to read cart: stored cart data is invalid.');
    return [];
  }
}

export function writeCart(items, ownerId = getCartOwnerId()) {
  const safeItems = Array.isArray(items)
    ? items
      .filter((item) => item && typeof item === 'object' && typeof item.name === 'string')
      .map((item) => ({
        ...item,
        quantity: Number.isInteger(Number(item.quantity))
          ? Math.min(MAX_CART_QUANTITY, Math.max(1, Number(item.quantity)))
          : 1,
      }))
    : [];
  localStorage.setItem(cartKey(ownerId), JSON.stringify(safeItems));
  window.dispatchEvent(new Event('cartUpdated'));
  return safeItems;
}

export function clearCart(ownerId = getCartOwnerId()) {
  localStorage.removeItem(cartKey(ownerId));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function removeOrderedItems(currentItems, orderedItems) {
  const remainingToRemove = new Map();
  (orderedItems || []).forEach((item) => {
    const id = item?.productId ? String(item.productId) : '';
    if (id) remainingToRemove.set(id, (remainingToRemove.get(id) || 0) + item.quantity);
  });

  return (currentItems || []).flatMap((item) => {
    const id = item?._id ? String(item._id) : '';
    const quantityToRemove = remainingToRemove.get(id) || 0;
    if (!id || quantityToRemove < 1) return [item];

    const removed = Math.min(item.quantity, quantityToRemove);
    remainingToRemove.set(id, quantityToRemove - removed);
    const quantityLeft = item.quantity - removed;
    return quantityLeft > 0 ? [{ ...item, quantity: quantityLeft }] : [];
  });
}

export function moveCart(fromOwnerId, toOwnerId) {
  if (fromOwnerId === toOwnerId) return readCart(toOwnerId);

  const sourceItems = readCart(fromOwnerId);
  const destinationItems = readCart(toOwnerId);
  const merged = [...destinationItems];
  sourceItems.forEach((sourceItem) => {
    const index = merged.findIndex((item) =>
      (sourceItem._id && item._id === sourceItem._id) ||
      (!sourceItem._id && item.name === sourceItem.name)
    );
    if (index >= 0) {
      const combinedQuantity = merged[index].quantity + sourceItem.quantity;
      if (combinedQuantity <= MAX_CART_QUANTITY) {
        merged[index] = { ...merged[index], quantity: combinedQuantity };
      } else {
        // Keep both rows intact; checkout can ask the user to reduce quantities.
        merged.push(sourceItem);
      }
    } else {
      merged.push(sourceItem);
    }
  });

  // Write first so a storage failure leaves the original cart untouched.
  writeCart(merged, toOwnerId);
  clearCart(fromOwnerId);
  return merged;
}

export function addCartItem(product, ownerId = getCartOwnerId()) {
  if (!product || typeof product.name !== 'string' || !product.name.trim()) {
    throw new Error('This product cannot be added to the cart.');
  }
  const items = readCart(ownerId);
  const index = items.findIndex((item) =>
    (product._id && item._id === product._id) || (!product._id && item.name === product.name)
  );
  if (index >= 0) {
    items[index].quantity = Math.min(MAX_CART_QUANTITY, items[index].quantity + 1);
  } else {
    items.push({ ...product, quantity: 1 });
  }
  return writeCart(items, ownerId);
}
