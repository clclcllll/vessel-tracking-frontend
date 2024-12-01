import request from '@/utils/request';

// 获取所有港口
    export function fetchPortsApi() {
        return request.get('/api/ports/all');
    }

// 获取指定港口的详细信息
export function fetchPortDetails(portId) {
    return request.get(`/api/ports/${portId}/details`);
}
