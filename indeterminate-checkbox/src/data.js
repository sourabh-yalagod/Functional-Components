const STATUS = {
  CHECKED: "checked",
  UNCHECKED: "unckecked",
  INDETERMINATE: "indeterminate",
};
const treeDate = [
  {
    label: "Projects",
    id: "Projects",
    status: STATUS.UNCHECKED,
    children: [
      {
        label: "Project-1",
        id: "Project-1",
        status: STATUS.UNCHECKED,
        children: [
          {
            label: "Reactjs",
            id: "Reactjs",
            status: STATUS.INDETERMINATE,
          },
          {
            label: "Nodejs",
            id: "Nodejs",
            status: STATUS.UNCHECKED,
          },
        ],
      },

      {
        label: "Project-2",
        id: "Project-2",
        status: STATUS.UNCHECKED,
        children: [
          {
            label: "AWS",
            id: "AWS",
            status: STATUS.UNCHECKED,
          },
          {
            label: "Nginx",
            id: "Nginx",
            status: STATUS.INDETERMINATE,
          },
        ],
      },
    ],
  },
];

export { STATUS, treeDate };
