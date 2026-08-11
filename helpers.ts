/**
 * Calculates the damage dealt by an attack.
 * 
 * @param baseDamage - The base damage of the attack.
 * @param attackMultiplier - A multiplier based on conditions (e.g., critical hits).
 * @param defenses - The defense value of the target.
 * @returns The actual damage dealt.
 */
function calculateDamage(baseDamage: number, attackMultiplier: number, defenses: number): number {
    const damage = baseDamage * attackMultiplier - defenses;
    return Math.max(damage, 0);
}

/**
 * Determines if the player hits based on their accuracy and the target's evasion.
 * 
 * @param accuracy - The player's accuracy rating.
 * @param evasion - The target's evasion rating.
 * @returns True if the attack hits, otherwise false.
 */
function doesAttackHit(accuracy: number, evasion: number): boolean {
    const hitChance = accuracy - evasion;
    return Math.random() < (hitChance / 100);
}

/**
 * Flattens an array of arrays into a single array.
 * 
 * @param arrays - An array of arrays to be flattened.
 * @returns A single array containing all elements from the input arrays.
 */
function flatten<T>(arrays: T[][]): T[] {
    return arrays.reduce((acc, val) => acc.concat(val), []);
}

// Export functions for use in other modules
export { calculateDamage, doesAttackHit, flatten };