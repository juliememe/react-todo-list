import {CategoryInterface} from "../categories-page/components/category/Category.interface";
import {Item} from "../categories-page/components/todo-item/Todo-item.interface";


export interface State {
    currentCategory: string | number,
    currentProgress: number,
    filterItemsIsDone: boolean,
    filterItemsValue: string,
    currentTodo: { item: Item | null, categoryId: string | number },
    currentTodoCategory: string | number,
    categories: { [id: string]: CategoryInterface }
};

export interface RootState {
    todo: State;
}

export const initialState: State = {
    currentCategory: '',
    currentProgress: 0,
    filterItemsIsDone: false,
    filterItemsValue: '',
    currentTodo: {item: null, categoryId: ''},
    currentTodoCategory: '',


    categories: {
        '1': {
            id: "1",
            title: '👩🏻‍💻 Work',
            items: [{id: "1", name: 'Sort out e-mails', isChecked: false}, {
                id: "11141",
                name: 'Arrange meetings',
                isChecked: false
            }],
            categories: ["3"],
            parentId: null,
        },

        '2': {
            id: "2",
            title: '🛒 Shopping',
            items: [{id: "1111", name: 'Buy cake', isChecked: false}, {id: '56878', name: 'Buy lemonade',isChecked: false}],
            categories: ["4"],
            parentId: '5',
        },
        '3': {
            id: "3",
            title: '‼️ Important',
            items: [{id: "11bs115", name: 'Meeting with CEO', isChecked: false}],
            categories: [],
            parentId: '1',
        },
        '4': {
            id: "4",
            title: '🐈‍⬛ Funny',
            items: [{id: "153", name: 'Buy the food', isChecked: false,}, {
                id: "11g141",
                name: 'Go for a walk',
                isChecked: false
            }],
            categories: [],
            parentId: '2'
        },
        '5': {
            id: "5",
            title: '🏠 Home',
            items: [{id: "111ag1", name: 'Global cleaning day!', isChecked: false}],
            categories: ["2"],
            parentId: null
        },
    }

};

export const reducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: {...state.categories, [action.payload.key]: {...action.payload.newCategory}},
            };

        case 'ADD_CATEGORY_INTO_CATEGORY':
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.key]: {...action.payload.newCategory},
                    [action.payload.newCategory.parentId]: {
                        ...state.categories[action.payload.newCategory.parentId],
                        categories: [action.payload.key, ...state.categories[action.payload.newCategory.parentId].categories]
                    }

                }
            }
        case 'MARK_AS_DONE_ITEM':
            const category = {...state.categories[action.payload.id]};
            category.items = category.items.map((el) => {
                if (el.id === action.payload.item.id) {
                    return action.payload.item;
                }
                return el;
            })
            return {
                ...state,
                categories: {...state.categories, [action.payload.id]: {...category}}

            };

        case 'DELETE_CATEGORY':
            const newState = {...state.categories}
            return {
                ...state, categories: {...deleteCategories(action.payload.id, newState)}
            }
        case 'ADD_TODO_ITEM':
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [state.currentCategory]: {
                        ...state.categories[state.currentCategory],
                        items: [action.payload.newTodoItem, ...state.categories[state.currentCategory].items],
                    },
                }
            }
        case 'SAVE_CURRENT_ID':
            return {
                ...state, currentCategory: action.payload.id
            }
        case 'EDIT_CATEGORY':
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.id]: {
                        ...state.categories[action.payload.id],
                        title: action.payload.categoryTitle,
                    }
                }
            }
        case 'CHECK_PROGRESS':
            return {
                ...state,
                currentProgress: checkTheProgress(state.categories)
            }

        case 'SET_CATEGORY_EDITABLE':
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.id]: {
                        ...state.categories[action.payload.id],
                        editable: action.payload.editable
                    }
                }
            }
        case 'EDIT_TODO_ITEM':
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.parentId]: {
                        ...state.categories[action.payload.parentId],
                        items: [...(state.categories[action.payload.parentId].items.filter((e) => e.id !== action.payload.itemId))],

                    },
                    [action.payload.newCategoryId]: {
                        ...state.categories[action.payload.newCategoryId],
                        items: [...(state.categories[action.payload.newCategoryId].items.filter((e) => e.id !== action.payload.itemId)), action.payload.item]

                    }
                }
            }
        case 'SET_FILTER_TODO_ITEMS':
            return {
                ...state,
                filterItemsIsDone: action.payload.itemsIsDone
            }
        case 'SET_CATEGORY_EXPANDED':
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.id]: {
                        ...state.categories[action.payload.id],
                        expanded: action.payload.categoryExpanded
                    }
                }
            }
        case 'SET_SEARCH_FILTER':
            return {
                ...state,
                filterItemsValue: action.payload.searchValue
            }
        case 'SET_CURRENT_TODO_ITEM':
            return {
                ...state,
                currentTodo: action.payload

            }
        case 'SET_TODO_CATEGORY':
            return {
                ...state,
                currentTodoCategory: action.payload.todoCategoryId
            }

        default:
            return state;
    }
}


function deleteCategories(id: string | number, categories: { [id: string]: CategoryInterface }) {
    if (categories[categories[id].parentId || '']) {
        categories[categories[id].parentId || ''].categories = categories[categories[id].parentId || ''].categories.filter((el) => el !== id);
    }
    const category = categories[id];
    delete categories[id];
    category.categories.forEach(categoryID => {
        deleteCategories(categoryID, categories);
    });

    return {...categories}
}

function checkTheProgress(categories: { [id: string]: CategoryInterface }) {
    let allCategories = Object.values(categories);
    let allCategoriesAmount = Object.keys(categories).length;
    const isDoneAmount = (allCategories.filter((e)=>e.items.length && e.items.every((e) => e.isChecked))).length;
    return Math.round(100 / allCategoriesAmount * isDoneAmount);
}


