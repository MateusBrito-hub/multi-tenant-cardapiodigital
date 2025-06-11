import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import { ITenant } from '../../models/tenants.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tenants: ITenant[] = [];
  tenantFormData: Partial<ITenant> = {};
  isModalOpen = false;
  page = 1;
  totalItems = 0;
  limit = 10;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = Number(params['page']) || 1;
      this.limit = Number(params['limit']) || 10;
      this.loadTenants();
    });
  }

  constructor(private tenantService: TenantService, private route: ActivatedRoute) {
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getTenants(this.page, this.limit).subscribe(response => {
      this.tenants = response.data;
      this.totalItems = response.total;
    });
  }

  openCreateModal() {
    this.tenantFormData = {};
    this.isModalOpen = true;
  }

  openEditModal(tenant: ITenant) {
    this.tenantFormData = { ...tenant };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.tenantFormData = {};
  }

  onSubmit() {
    if (this.tenantFormData.cnpj) {
      this.tenantService
        .updateTenant(this.tenantFormData.cnpj, this.tenantFormData)
        .subscribe(() => {
          this.loadTenants();
          this.closeModal();
        });
    } else {
      const { name, ...rest } = this.tenantFormData;
      if (!name) {
        return;
      }
      const tenantData = {
        name,
        ...rest,
      } as Omit<ITenant, 'id' | 'createdAt'>;
      this.tenantService.createTenant(tenantData).subscribe(() => {
        this.loadTenants();
        this.closeModal();
      });
    }
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.loadTenants();
  }

  changePageSize(newLimit: number) {
    this.limit = newLimit;
    this.page = 1;  // resetar para a primeira página ao mudar limite
    this.loadTenants();
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }
}
