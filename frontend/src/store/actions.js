import { 
    COMPANY_LIST_BYNUMBER_REQUEST,
    COMPANY_LIST_BYNUMBER_SUCCESS,
    COMPANY_LIST_BYNUMBER_FAIL,
    COMPANY_LIST_RESTRICT_REQUEST,
    COMPANY_LIST_RESTRICT_SUCCESS,
    COMPANY_LIST_RESTRICT_FAIL
 } from './constants'
 
 import axios from 'axios'

 export const listRestrictedCompanies = (keyword = '') => async (dispatch) => {
    try {
        dispatch({type: COMPANY_LIST_RESTRICT_REQUEST})  
        const { data } = await axios.get(`/api/companies${keyword}`)     
        dispatch({
            type: COMPANY_LIST_RESTRICT_SUCCESS,
            payload: data
        })
    }catch(error) { 
        dispatch({
            type: COMPANY_LIST_RESTRICT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        
    }

}

export const listCompanyByNumber = (number) => async (dispatch) => {
    try {      
        dispatch({type: COMPANY_LIST_BYNUMBER_REQUEST})
        const { data } = await axios.get(`/api/companies/${number}`)
        dispatch({
            type:COMPANY_LIST_BYNUMBER_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: COMPANY_LIST_BYNUMBER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })        
    }

}