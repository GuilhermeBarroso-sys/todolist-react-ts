import { createContext, ReactNode, useEffect, useState } from "react";
type LoadingData = {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}




export const Loading = createContext({} as LoadingData);
type LoadingProvider = {
	children: ReactNode;
}

export function LoadingProvider(props : LoadingProvider) {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<Loading.Provider value ={{loading, setLoading }}>
			{loading && <div></div>}
			{props.children}
		</Loading.Provider>
	);
}