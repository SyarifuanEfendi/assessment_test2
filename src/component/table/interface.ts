export declare type actionType = {
  id: string;
  onRender?: (item: any) => boolean;
  className?: React.ClassAttributes<any>;
} & ContextType;

export declare type TableProps = {
  columns: any[];
  data: any[];
  withAction?: boolean;
  actionsMenu?: Array<actionType>;
  filter?: {
    handleFilterOnchange(e: any, parent?: string): any;
    onSetFilter(): any;
  };
};

export declare type ContextType = {
  name: JSX.Element | string | undefined;
  onClick: (
    data?: any,
    menu?: ContextType,
    indexMenu?: number,
    index?: number
  ) => any;
};