import { useState } from 'react'
import api from '../../services/api'
import axios from 'axios';

interface Props{
    endpoint: string;
    onSuccess?: () => void;
}

const usePutData = <T extends Record<string, any>>({endpoint, onSuccess}: Props) => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const update = async (endpoint_id: number, data: T) => {
        setError("");
        setLoading(true);

        try{
        const response = await api.put(`${endpoint}/${endpoint_id}/`, data)

        onSuccess?.();
        return response.data
        }catch(err){
            if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.detail ??
            err.response?.statusText ??
            "Failed to update",
        );
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
        }finally {
      setLoading(false);
    }
    }
   return { update, error, loading, setError, setLoading };
}

export default usePutData