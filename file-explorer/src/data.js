export const data = {
    1: {
        id: 1,
        name: 'File Explore',
        type: 'folder',
        parentId:null,
        children:[2,3,4]
    },
    2: {
        id: 2,
        name: 'node_modules',
        type: 'folder',
        parentId:1,
        children:[]
    },
    3: {
        id: 3,
        name: 'public',
        type: 'folder',
        parentId:1,
        children:[5,6,7]
    },
    4: {
        id: 4,
        name: 'src',
        type: 'folder',
        parentId:1,
        children:[]
    },
    5: {
        id: 5,
        name: 'index.html',
        type: 'file',
        parentId:3,
        children:[]
    },
    6: {
        id: 6,
        name: 'style.css',
        type: 'file',
        parentId:3,
        children:[]
    },
    7:{
        id: 7,
        name: 'app.js',
        type: 'file',
        parentId:3,
        children:[]
    },
}