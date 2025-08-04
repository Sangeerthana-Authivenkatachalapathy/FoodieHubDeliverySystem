import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserListResponse, UserFilters, UserStatus } from '@shared/models/user.model';
import { API_ENDPOINTS, QUERY_PARAMS } from '@shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  /**
   * Get all users with pagination and filtering
   * Implements: GetAllUsers
   */
  getAllUsers(page: number = 1, pageSize: number = 10, filters?: UserFilters): Observable<UserListResponse> {
    let params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString());

    if (filters) {
      if (filters.role) {
        params = params.set(QUERY_PARAMS.FILTERS.ROLE, filters.role);
      }
      if (filters.status) {
        params = params.set(QUERY_PARAMS.FILTERS.STATUS, filters.status);
      }
      if (filters.searchTerm) {
        params = params.set(QUERY_PARAMS.FILTERS.SEARCH, filters.searchTerm);
      }
      if (filters.dateFrom) {
        params = params.set(QUERY_PARAMS.FILTERS.DATE_FROM, filters.dateFrom.toISOString());
      }
      if (filters.dateTo) {
        params = params.set(QUERY_PARAMS.FILTERS.DATE_TO, filters.dateTo.toISOString());
      }
    }

    return this.http.get<UserListResponse>(API_ENDPOINTS.USERS.GET_ALL, { params });
  }

  /**
   * Get user by ID
   * Implements: GetUserById
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(API_ENDPOINTS.USERS.GET_BY_ID(id));
  }

  /**
   * Update user status (activate, deactivate, suspend)
   * Implements: UpdateUserStatus
   */
  updateUserStatus(id: string, status: UserStatus, reason?: string): Observable<any> {
    const body = { status, reason };
    return this.http.put(API_ENDPOINTS.USERS.UPDATE_STATUS(id), body);
  }

  /**
   * Delete user
   * Implements: DeleteUser
   */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.USERS.DELETE(id));
  }

  /**
   * Export users data
   */
  exportUsers(filters?: UserFilters): Observable<Blob> {
    let params = new HttpParams();

    if (filters) {
      if (filters.role) {
        params = params.set(QUERY_PARAMS.FILTERS.ROLE, filters.role);
      }
      if (filters.status) {
        params = params.set(QUERY_PARAMS.FILTERS.STATUS, filters.status);
      }
      if (filters.dateFrom) {
        params = params.set(QUERY_PARAMS.FILTERS.DATE_FROM, filters.dateFrom.toISOString());
      }
      if (filters.dateTo) {
        params = params.set(QUERY_PARAMS.FILTERS.DATE_TO, filters.dateTo.toISOString());
      }
    }

    return this.http.get(API_ENDPOINTS.USERS.EXPORT, { 
      params, 
      responseType: 'blob'
    });
  }

  /**
   * Get user statistics
   */
  getUserStatistics(): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.USERS.GET_ALL}/statistics`);
  }
}