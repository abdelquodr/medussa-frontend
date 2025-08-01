
const setStorageItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));
const getStorageItem = (key: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return JSON.parse(localStorage.getItem(key) as any) || null
    }
}
const removeStorageItem = (key: string) => localStorage.removeItem(key)
const clearStorageItem = () => localStorage.clear()

export {
    setStorageItem,
    getStorageItem,
    removeStorageItem,
    clearStorageItem
}