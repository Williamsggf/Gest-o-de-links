import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEY = "links-storage"

export type LinksSorage = {
    id: string;
    name: string;
    url: string;
    category: string;
}

async function get() {
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : [];

    return response;
}

async function save(newlink: LinksSorage) {
    try {
        const storage = await get()

        const updated = JSON.stringify([...storage, newlink])

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated)

    } catch (error) {
        throw error
    }
}

export const linksStorage = {
    get,
    save
}