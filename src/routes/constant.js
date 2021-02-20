export const ROUTE = {
    USERS:{
        HOME:'/',
        LOGIN:'/login',
        REGISTER:'/register',
        PROFILE:'/profile',
        LOGOUT:'/logout',
    },
    FRIENDS:{
        CHAT:'/friends/chat',
        GROUPS:{
            MAIN:'/groups/chat/main',
            CHAT:'/groups/chat/',
        }
    },
    ABOUT_US:'/aboutus/',
    VERIFY_EMAIL:'/email/verify',
}

export const PAGE = {
    USERS:{
        HOME:'user.main.home',
        PROFILE:'user.profile',
        LOGOUT:'user.logout',
    },
    FRIENDS:{
        CHAT:'friends.chat.page',
        GROUPS:{
            MAIN:'friends.group.main.page',
            CHAT:'friends.group.chat.page',
        },
    },
    ABOUT_US:'about.us.page',
    VERIFY_EMAIL:'email.verify.page',
}