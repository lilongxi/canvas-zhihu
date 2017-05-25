export const visibilityFilter = (action, state="SHOW_ALL") => {
	switch(action.type){
		case "SET_VISIBILITY_FILTER" :
			return action.visibilityFilter
		default:
			return state
	}
}