import { ref } from 'vue';
export interface Notification {
    imessage: string
    type: 'info' | 'success' | 'warning' | 'error'
}

const notifications = ref<Notification[]>([])

export const refNotifications = () => { return notifications}

export function addNotifications(notification){
    notifications.value.push(notification)
}

export function removeNotification(index: number) {
        notifications.value.splice(index, 1)
}