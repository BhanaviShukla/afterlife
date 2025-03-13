import { useWill } from "@/appState/WillState";
import { useRef, useCallback, useState, useEffect } from "react";
// REF: https://medium.com/swlh/using-a-debounced-callback-in-react-ade57d31ca6b
/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param func The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */
export const useDebouncedCallback = (func, wait) => {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef();

  return useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
};

export const useCountFromWillOrSearchParams = (searchParams, category) => {
  const { will } = useWill();
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (will[category].length) setCount(will[category].length);
    else if (searchParams && Number(searchParams.get("count")))
      setCount(Number(searchParams.get("count")));
  }, [searchParams, will, category]);

  console.log({ count });
  return [count, setCount];
};

export const useReligionFromWillOrSearchParams = (searchParams) => {
  const { will } = useWill();
  const [religion, setReligion] = useState("none");

  useEffect(() => {
    if (will.rites.religion) setReligion(will.rites.religion);
    else if (searchParams && searchParams.get("religion"))
      setReligion(String(searchParams.get("religion")));
    else setReligion("none");
  }, [searchParams, will]);

  return [religion, setReligion];
};

export const useCategoryList = (count, category) => {
  const { will } = useWill();
  const [list, setList] = useState([]);
  console.log(will[category], { list });

  useEffect(() => {
    const countOfObjectsInWill = will[category].length;
    const updatedList = will[category].length ? [...will[category]] : [];
    if (countOfObjectsInWill > count) {
      // if count from UI has been updated to be less,
      // we need to remove the younger list
      const difference = countOfObjectsInWill - count;
      updatedList.splice(-difference);
    } else if (countOfObjectsInWill < count) {
      // if count from UI has been updated to be less
      // we need to add UI for the difference
      const difference = count - countOfObjectsInWill;
      console.log({ count, difference });
      for (let i = 0; i < difference; i++) {
        console.log({ i });
        const newObject = {
          id: Date.now() + i,
        };
        updatedList.push(newObject);
      }
    }

    console.log({ list, updatedList });
    if (updatedList.length !== list.length) setList(updatedList);
  }, [count, will[category]]);

  return [list, setList];
};
