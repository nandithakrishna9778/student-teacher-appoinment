// js/logger.js

export function logAction(module, message) {
    const timestamp = new Date().toLocaleString();

    console.log(
        `[${timestamp}] [${module}] ${message}`
    );
}

export function logError(module, error) {
    const timestamp = new Date().toLocaleString();

    console.error(
        `[${timestamp}] [${module}] ERROR: ${error}`
    );
}
