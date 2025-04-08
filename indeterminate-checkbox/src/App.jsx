import React, { useEffect, useRef, useState } from "react";
import { STATUS, treeDate } from "./data";
import Text from "./Text";

const App = () => {
  const [data, setDate] = useState(treeDate);

  const traverse = (tree, targetId, searchingNode, parentStatus) => {
    tree.map((node) => {
      if (searchingNode) {
        node.status = parentStatus;
      }
      if (node.id == targetId) {
        if (node.status === STATUS.CHECKED) {
          node.status = STATUS.UNCHECKED;
        } else {
          node.status = STATUS.CHECKED;
        }
      }

      if (node?.children) {
        traverse(
          node?.children,
          targetId,
          node.id === targetId || searchingNode,
          node.status
        );
      }
      checkChildrenStatus(node);
    });
  };

  const checkChildrenStatus = (node) => {
    if (!node?.children?.length > 0) return;
    let indeterminateCount = 0;
    let checkedCount = 0;
    let unCheckedCount = 0;
    node.children.map((item) => {
      if (item.status === STATUS.CHECKED) checkedCount++;
      if (item.status === STATUS.UNCHECKED) unCheckedCount++;
      if (item.status === STATUS.INDETERMINATE) indeterminateCount++;
    });
    if (node?.children.length === checkedCount) {
      node.status = STATUS.CHECKED;
    }
    if (unCheckedCount === node.children.length) {
      node.status = STATUS.UNCHECKED;
    }
    if (
      checkedCount > 0 &&
      checkedCount < node.children.length &&
      unCheckedCount > 0
    ) {
      console.log(node);

      node.status = STATUS.INDETERMINATE;
    }
  };

  const handleCheck = (targetId) => {
    const treeClone = JSON.parse(JSON.stringify(data));
    traverse(treeClone, targetId);
    setDate(treeClone);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <Text
            text={"Indeterminate List"}
            duration={1000}
            className="text-3xl font-bold text-gray-800 dark:text-white"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <TreeList handleCheck={handleCheck} data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;

const TreeList = ({ data, handleCheck }) => {
  return (
    <div className="space-y-2">
      {data?.map((item) => {
        return (
          <div
            id={item.id}
            key={item.id}
            className="px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor={item.id}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {item.label}
              </label>
              <CheckBox
                handleCheck={handleCheck}
                status={item.status}
                data={item}
              />
            </div>
            {item.children && (
              <div className="mt-2 ml-4 border-l pl-4 border-gray-300 dark:border-gray-600">
                <TreeList handleCheck={handleCheck} data={item.children} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const CheckBox = ({ status, data, handleCheck }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (status === STATUS.INDETERMINATE) {
      ref.current.indeterminate = true;
    } else {
      ref.current.indeterminate = false;
    }
  }, [status]);
  return (
    <input
      type="checkbox"
      name={data.id}
      onChange={() => handleCheck(data?.id)}
      id={data.id}
      key={data.id}
      checked={status === STATUS.CHECKED}
      ref={ref}
    />
  );
};
