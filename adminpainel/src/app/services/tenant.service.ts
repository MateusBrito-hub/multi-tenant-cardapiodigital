import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environments';
import { ITenant } from '../models/tenants.model'; // ajuste o caminho se necessário
@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/company`;

  getTenants(page: number, limit: number): Observable<{ data: any[], total: number }> {
    const params = {
      page,
      limit
    };

    return this.http.get<any[]>('http://localhost:3000/company', { params, observe: 'response' })
      .pipe(
        map((resp: HttpResponse<any[]>) => {
          const total = Number(resp.headers.get('x-total-count')) || 0;
          return { data: resp.body || [], total };
        })
      );
  }

  createTenant(tenantData: Omit<ITenant, 'id' | 'createdAt'>) {
    return this.http.post<ITenant>(this.apiUrl, tenantData);
  }

  updateTenant(cnpj: string, tenantData: Partial<ITenant>) {
    return this.http.put<ITenant>(`${this.apiUrl}/${cnpj}`, tenantData);
  }

  deleteTenant(cnpj: string) {
    return this.http.delete(`${this.apiUrl}/${cnpj}`);
  }
}
