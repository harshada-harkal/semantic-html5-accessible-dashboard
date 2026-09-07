const STORAGE_KEY = "dashboard_preferences";

export function savePreferences(preferences) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(preferences)
    );
}

export function getPreferences() {
    const savedPreferences =
        localStorage.getItem(STORAGE_KEY);

    if (!savedPreferences) {
        return {
            search: "",
            category: "all",
            sort: "default"
        };
    }

    try {
        return JSON.parse(savedPreferences);
    } catch (error) {
        console.error(
            "Unable to read saved preferences:",
            error
        );

        return {
            search: "",
            category: "all",
            sort: "default"
        };
    }
}

export function clearPreferences() {
    localStorage.removeItem(STORAGE_KEY);
}
