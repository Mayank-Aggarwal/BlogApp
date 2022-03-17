const defaultState = {
    email: '',
    articles: [],
    isLoggedIn: false,
    token: '',
    id:''
};

export default function userReducer(state = defaultState, action) {
    switch(action.type) {
        case 'UPDATE_LOGIN_DATA': return { ...state, isLoggedIn: true, token: action.payload.token, email: action.payload.user.email, articles: action.payload.user.articles }
        case 'DELETE_LOGIN_DATA': return defaultState;
        case 'UPDATE_ARTICLES_DATA': return { ...state, articles: action.payload}
        default: return state; 
    }
}
