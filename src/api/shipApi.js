// src/api/shipApi.js
import request from '@/utils/request';

// 获取船舶列表
export function fetchShips() {
    return request.get('/api/ships');
}

// 获取指定船舶的轨迹数据
export function fetchTrajectory(shipId, startTime, endTime) {
    return request.get(`/api/ships/${shipId}/positions`, {
        params: {
            start_time: startTime,
            end_time: endTime,
        },
    });
}
