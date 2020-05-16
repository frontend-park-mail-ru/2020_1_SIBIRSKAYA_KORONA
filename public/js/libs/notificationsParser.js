import parseDate from '../libs/dateParser.js';
/**
 * Parse notification from backend
 * @param {Object} msg - notification message to parse
 * @param {Object} config - {enableIsRead, enableDate} set to true for parse date and isRead flag, default false
 * @return {Object} - parsed notification
 */
export const parseNotification = (msg, config = {enableIsRead: false, enableDate: false}) => {
    let parsedNotificationData = {};
    switch (msg.eventType) {
        case 'AssignOnTask': {
            let taskHref = '/boards/' + msg.metaData.bid;
            taskHref += '/columns/' + msg.metaData.cid;
            taskHref += '/tasks/' + msg.metaData.tid;
            if (msg.uid === msg.metaData?.user?.id) {
                // this means we are invitee
                parsedNotificationData = {
                    user: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    link: {text: msg.metaData.entityData, href: taskHref},
                    text: 'назначил Вас исполнителем задачи',
                };
            } else {
                // this means somebody invited somebody
                parsedNotificationData = {
                    inviter: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    invitee: {nickname: msg.metaData.user?.nickname, avatar: msg.metaData.user?.avatar},
                    link: {text: msg.metaData.entityData, href: taskHref},
                    text: 'назначил исполнителем задачи',
                };
            }
            break;
        }
        case 'InviteToBoard': {
            if (msg.uid === msg.metaData?.user?.id) {
                parsedNotificationData = {
                    user: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    link: {text: msg.metaData.entityData, href: `/boards/${msg.metaData.bid}`},
                    text: 'пригласил Вас в доску',
                };
            } else {
                parsedNotificationData = {
                    inviter: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    invitee: {nickname: msg.metaData.user?.nickname, avatar: msg.metaData.user?.avatar},
                    link: {text: msg.metaData.entityData, href: `/boards/${msg.metaData.bid}`},
                    text: 'пригласил в доску',
                };
            }
            break;
        }
        case 'AddComment':
            let taskHref = '/boards/' + msg.metaData.bid;
            taskHref += '/columns/' + msg.metaData.cid;
            taskHref += '/tasks/' + msg.metaData.tid;
            parsedNotificationData = {
                user: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                link: {text: msg.metaData.entityData, href: taskHref},
                text: 'прокомментировал задачу',
                comment: msg.metaData?.text,
            };
            break;
        default:
            // We don`t need to render it because this message type handles in other place
            return;
    }
    if (config.enableDate) {
        parsedNotificationData.date = parseDate(msg.createAt);
    }
    if (config.enableIsRead) {
        parsedNotificationData.isRead = !!msg.isRead;
    }
    parsedNotificationData.type = msg.eventType;
    return parsedNotificationData;
};

