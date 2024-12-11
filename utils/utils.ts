export function findMissingId(productIds: number[]) {
  // Sort the IDs in ascending order
  productIds.sort((a, b) => a - b)

  // Iterate through the sorted IDs and find the gap
  for (let i = 1; i < productIds.length; i++) {
    if (productIds[i] - productIds[i - 1] > 1) {
      return productIds[i - 1] + 1
    }
  }

  // If no gap is found, return the next available ID
  return productIds[productIds.length - 1] + 1
}
