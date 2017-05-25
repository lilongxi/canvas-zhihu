//响应，ajax无效

//用来描述待办项
export const todo = (action, state) => {
	switch (action.type){
		case "ADD_TODO" :
			return {
				id:action.id,
				text:action.text,
				completed:false
			}
		case "TOGGLE_TODO":
			state.id !== action.id && return state
			return Object.assign({}, state, {
				completed:!state.completed
			})
		default:
			return state
	}
}

export const todos = (action, state) => {
	switch(action.type){
		case "ADD_TODO" :
			return [
				...state,
				todo(action, undefined)
			]
		case "TOGGLE_TODO":
			return state.map(t => todo(action, t))
		default:
			return state
	}
}
