// serverActions.ts
import axios from "axios"

import { API_URL, CALIBRATE_URL } from "@/config/env"
import { cookies } from "next/headers";

export async function fetchSensorData(userId: number | undefined, filters: string[]) {
  const params: any = {
    page: 1,
    limit: 15,
    sortBy: "timestamp",
    sortOrder: "desc",
    filters: filters,
  };

  if (userId) {
    params.filters.push(`userId=eq_${userId}`);
  }

  try {
    const response = await axios.get(`${CALIBRATE_URL}/sensorDatas/list/filter`, { params });
    return { sensorDataValue: response.data?.data, sensorTotal: response.data?.total };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Response data:', error.response?.data);
      console.error('Request URL:', error?.config?.url);
      console.error('Request params:', error?.config?.params);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}


// for all users
export async function fetchAllSensorData() {
  const response = await axios.get(`${CALIBRATE_URL}/sensorDatas/list/filter`, {
    params: {
      page: 1,
      limit: 15,
      sortBy: "timestamp",
      sortOrder: "desc",
    },
  })

  return {
    sensorDataValue: response.data?.data,
    sensorTotal: response.data?.total,
  }
}


// fetchAll Device Data 
export async function fetchAllDeviceData() {
  const response = await axios.get(`${CALIBRATE_URL}/devices/list/filter`, {
    params: {
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  })

  return {
    deviceDataValue: response.data?.data,
    deviceTotal: response.data?.total,
  }
}



// get user by id 
export async function fetchUserDataById(userId:number) {
  const response = await axios.get(`${API_URL}/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return {
    userData: response.data,
  }
}

// fetchAll Position Data 
export async function fetchAllPositionData() {
  const response = await axios.get(`${CALIBRATE_URL}/positions/list/filter`, {
    params: {
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  })

  return {
    positionDataValue: response.data?.data,
    positionTotal: response.data?.total,
  }
}


// fetchAll Route Data 
export async function fetchAllRouteData() {
  const response = await axios.get(`${CALIBRATE_URL}/routes/list/filter`, {
    params: {
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  })

  return {
    routeDataValue: response.data?.data,
    routeTotal: response.data?.total,
  }
}