export interface ProjectModel {
  projectId: number;
  projectName: string;
  description: string;
  areaName: string;
  fieldName: string;
  image: string;
  createAt: Date;
  brand: string;
  startDate: Date;
  endDate: Date;
  status: string;
  funded: number;
}

export interface OwnerProjectModel {
  fieldId: number;
  areaId: string;
  projectName: string;
  brand: string;
  investmentTargetCapital: number;
  sharedRevenue: number;
  multiplier: number;
  duration: number;
  startDate: Date;
  endDate: Date;
  image: string;
  projectDescription: string;
  businessLicense: string;
  paidAmount: number;
  remainingAmount: number;
  investedCapital: number;
}
