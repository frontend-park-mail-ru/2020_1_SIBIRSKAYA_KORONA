/**
 * Parse notification from backend
 * @param {Object} msg - notification message to parse
 * @return {Object} - parsed notification
 */
export const parseNotification = (msg) => {
    switch (msg.eventType) {
        case 'AssignOnTask': {
            let taskHref = '/boards/' + msg.metaData.bid;
            taskHref += '/columns/' + msg.metaData.cid;
            taskHref += '/tasks/' + msg.metaData.tid;
            if (msg.uid === msg.metaData?.user?.id) {
                // this means we are invitee
                return {
                    user: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    link: {text: msg.metaData.entityData, href: taskHref},
                    text: 'Назначил Вас исполнителем задачи',
                };
            } else {
                // this means somebody invited somebody
                return {
                    inviter: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    invitee: {nickname: msg.metaData.user?.nickname, avatar: msg.metaData.user?.avatar},
                    link: {text: msg.metaData.entityData, href: taskHref},
                    text: 'назначил исполнителем задачи',
                };
            }
        }
        case 'InviteToBoard': {
            if (msg.uid === msg.metaData?.user?.id) {
                return {
                    user: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    link: {text: msg.metaData.entityData, href: `/boards/${msg.metaData.bid}`},
                    text: 'пригласил Вас в доску',
                };
            } else {
                return {
                    inviter: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                    invitee: {nickname: msg.metaData.user?.nickname, avatar: msg.metaData.user?.avatar},
                    link: {text: msg.metaData.entityData, href: `/boards/${msg.metaData.bid}`},
                    text: 'пригласил в доску',
                };
            }
        }
        default:
            // We don`t need to render it because this message type handles in other place
            return;
    }
};

