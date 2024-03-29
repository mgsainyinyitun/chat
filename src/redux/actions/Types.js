
export const USER = {
    REGISTER:'register.user',
    REGISTER_REQUEST:'request.register',
    REGISTER_REQUEST_FAIL:'request.register.fail',
    EMAIL_VERIFY:'email.verity.of.user',
    LOGIN:'login.user',
    LOGIN_ERROR:'login.error',
    SIGNOUT:'signout.user',
    SETPROFILEDATA:'data.of.user',
    DATA_FETCHING_CHANGE:'change.fetching.user.data',
    EDIT_PROFILE:'edit.profile.of.user',
    LOGIN_REQUEST:'login.request.user',
    LOGIN_REQUEST_SUCCESS:'login.request.success',
}

export const THEME = {
    CHANGE:'change.theme',
    LIGHT:'light.theme',
    DARK:'dark.theme',
}

export const LANGUAGES = {
    CHANGE:'language.change',
    GET:'language.get',
    ENG:'language.english',
    MYAN:'language.myanmar',
}

export const FRIENDS = {
    SEARCH:{
        LIST:'friend.search.list',
    },
    UNFRIEND:'unfriend.friend',
    ADD:'add.friend',
    SUCCESS_ADD_FRIEND:'add.friend.success',
    SUCCESS_ADD_FRIEND_REQUEST:'add.friend.request.to.list',
    REMOVE_FRIEND_REQUEST:'remove.friend.request',
    EDIT_FRIEND_DATA:'edit.friend.data',
    GET_FRIENDS_LIST:'get.friends.list',
}

export const MESSAGE = {
    SEND_SET_TO_USER:'send.message.set.to.user',
    FETCH_MESSAGE_LIST:'fetch.message.list',
    SEND_SET_TO_FRIENT:'send.message.set.to.friend',
    RECEIVE_MESSAGE:'message.received',
    NO_MESSAGE_SENT:'no.empty.message.sent',
    NO_MESSAGE_RECEIVE:'no.receive.messages',
    EDIT:'edit.message',
    DELETE:'delete.message',
    SET_CURRENT_CHAT_FRIENT:'set.current.chat.friend',
    DELETE_ALL_FRIEND_MESSAGE:'delete.all.friend.message',
}


export const GROUP = {
    GET_MEMBER_INFO:'get.member.info',
    UPDATE_MEMBER:'update.group.member',
    EMPTY:'empty.group',
    CURRENT_GROUP:'set.current.group',
    GET:'get.user.groups',
    CREATE:'create.group',
    DELETE:'delete.group',
    EDIT:'edit.group',
    ADD_MEMBER:'add.memmber.to.group',
    REMOVE_MEMBER:'remove.member.from.group',
    GROUP_MESSAGES_GET:'get.group.messages',
}