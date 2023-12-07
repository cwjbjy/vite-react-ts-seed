import React from 'react';

export interface DataType {
  key: number;
  dataName: string;
  dataDate: string;
  dataNum: number;
  dataMoney: number;
  atomMoney: string;
}

interface Context {
  smallScreen: boolean;
  isModalVisible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataSource: DataType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const defaultValue = {
  smallScreen: false,
  isModalVisible: false,
  setModal: () => {},
  dataSource: [],
  setDataSource: () => {},
};

export const MyContext = React.createContext<Context>(defaultValue);
