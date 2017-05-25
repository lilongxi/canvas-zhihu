import uuid from 'node-uuid';

//用户行为

export const addTodo = (text) => {
	return {
		type:"ADD_TODO",
		id:uuid.v4(),
		text
	}
}

//设置可见
export const setVisibility = (filter) => {
	return {
		type:"SET_VISIBILITY",
		filter
	}
}

export const toggleTodo = (id) => {
	return {
		type:"TOGGLE_TODO",
		id
	}
}
