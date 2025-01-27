import { useWill } from "@/appState/WillState";
import { useEffect, useState } from "react";

export const useCountFromWillOrSearchParams = (searchParams) => {
  const { will } = useWill();
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (will.children.length) setCount(will.children.length);
    else if (searchParams && Number(searchParams.get("count")))
      setCount(Number(searchParams.get("count")));
  }, [searchParams, will.children]);

  console.log({ count });
  return [count, setCount];
};

export const useChildrenList = (count) => {
  const { will } = useWill();
  const [children, setChildren] = useState([]);
  console.log(will.children, { children });

  useEffect(() => {
    const countOfChildrenInWill = will.children.length;
    const updatedChildren = will.children.length ? [...will.children] : [];
    if (countOfChildrenInWill > count) {
      // if count from UI has been updated to be less,
      // we need to remove the younger children
      const difference = countOfChildrenInWill - count;
      updatedChildren.splice(-difference);
    } else if (countOfChildrenInWill < count) {
      // if count from UI has been updated to be less
      // we need to add UI for the difference
      const difference = count - countOfChildrenInWill;
      console.log({ count, difference });
      for (let i = 0; i < difference; i++) {
        console.log({ i });
        const newChild = {
          id: Date.now() + i,
          dob: "",
          childName: "",
        };
        updatedChildren.push(newChild);
      }
    }

    console.log({ children, updatedChildren });
    if (updatedChildren.length !== children.length)
      setChildren(updatedChildren);
  }, [count, will.children]);

  return [children, setChildren];
};

export const sortObjectByDob = (a, b) => {
  console.log({ a, b }, !a.dob);
  // no sorting if DOB not provided to avoid confusion for the user
  if (!a.dob || !b.dob) return 0; //
  else return new Date(a.dob) - new Date(b.dob);
};
