const defaultState = {
    articles: [],
    selectedArticle: {},
};

export default function homeReducer(state = defaultState, action) {
    switch(action.type) {
        case 'ALL_ARTICLES_DATA': return { ...state, articles: action.payload }
        case 'UPDATE_SELECTED_ARTICLE_DATA' : return {...state, selectedArticle: action.payload}
        default: return state; 
    }
}
