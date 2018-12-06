const initialState = {
    isAuthenticated: false,
    user: {
        userId: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    },
    messages: [],
    currentMessage: '',
    isLoading: null,
    infoMessage: '',
    isSuccess: null,
    accessToken: '',
    chatrooms: [],
    currentChatroom: '',
    users: [],
    selectedUsers: [],
};

export default initialState;