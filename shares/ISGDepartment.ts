export interface ISGDepartment {
  deptCode: string;
  name: string;
  deptFullName: string;
  parentDeptCode?: string;
  parentDeptName?: string;

  officeTel?: string;
  officeFax?: string;
  jobDescription: string;
  depth: number;
  useYn: boolean;

  childDepartments?: Array<ISGDepartment>;
}
