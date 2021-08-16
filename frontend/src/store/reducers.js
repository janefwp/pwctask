import { 
    COMPANY_LIST_BYNUMBER_REQUEST,
    COMPANY_LIST_BYNUMBER_SUCCESS,
    COMPANY_LIST_BYNUMBER_FAIL,
    COMPANY_LIST_RESTRICT_REQUEST,
    COMPANY_LIST_RESTRICT_SUCCESS,
    COMPANY_LIST_RESTRICT_FAIL
 } from './constants'


 export const companyListReducer = (state={companies:[]},action) => {
    switch(action.type) {
        case COMPANY_LIST_BYNUMBER_REQUEST:
        case COMPANY_LIST_RESTRICT_REQUEST:
            return {loading:true, companies: []}
        case COMPANY_LIST_BYNUMBER_SUCCESS:
            return {
                loading:false, 
                companies: action.payload, 
                page: 1,
                pages: 1,
            }
        case COMPANY_LIST_RESTRICT_SUCCESS:
            return {
                loading:false, 
                companies: action.payload.companies, 
                page: action.payload.page,
                pages: action.payload.pages,
            }
        case COMPANY_LIST_BYNUMBER_FAIL:
        case COMPANY_LIST_RESTRICT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}