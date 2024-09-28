import { AxiosError } from 'axios';
import { Href } from 'expo-router';


export interface NavTypes {
  url: Href<string | object>;
}

export interface TabButtonType {
  title: string;
  value?: string;
}


export type AppError = Error | AxiosError<CustomError>;

export interface CustomError {
  isAxiosError?: boolean;
  statusCode?: number;
  data?: string;
  message?: string;
}
interface Hair {
  color: string;
  type: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

export interface UsersListInterface {
  users: User[]
}

export interface AddressInterface {
  address: string,
  city: string,
  state: string,
  stateCode: string,
  postalCode: string,
  coordinates: {
    lat: number,
    lng: number
  },
  country: string
}