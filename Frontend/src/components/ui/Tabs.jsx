import React, { useState } from "react";

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      <TabsList activeTab={activeTab} setActiveTab={setActiveTab}>
        {children.map((child) =>
          child.type.displayName === "TabsTrigger" ? child : null
        )}
      </TabsList>

      <div className="mt-4">
        {children.map(
          (child) =>
            child.type.displayName === "TabsContent" &&
            child.props.value === activeTab && <div key={child.props.value}>{child}</div>
        )}
      </div>
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex space-x-4 border-b">
    {children.map((child) =>
      React.cloneElement(child, {
        key: child.props.value,
        active: activeTab === child.props.value,
        onClick: () => setActiveTab(child.props.value),
      })
    )}
  </div>
);

export const TabsTrigger = ({ value, active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium focus:outline-none ${
      active
        ? "border-b-2 border-blue-500 text-blue-500"
        : "text-gray-600 hover:text-gray-800"
    }`}
  >
    {children}
  </button>
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = ({ children }) => <div>{children}</div>;
TabsContent.displayName = "TabsContent";
