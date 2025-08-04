#!/bin/bash

echo "🚀 Generating FoodieHub Admin Components..."

# Create main feature components
ng generate component components/login
ng generate component components/layout
ng generate component components/dashboard
ng generate component components/user-management
ng generate component components/restaurant-management
ng generate component components/delivery-partner-management
ng generate component components/order-management
ng generate component components/feedback-management
ng generate component components/notification-management
ng generate component components/financial-reports

# Create dashboard sub-components
ng generate component components/dashboard/components/stats-cards
ng generate component components/dashboard/components/revenue-chart
ng generate component components/dashboard/components/order-overview
ng generate component components/dashboard/components/recent-activities
ng generate component components/dashboard/components/quick-actions

# Create user management sub-components
ng generate component components/user-management/components/user-table
ng generate component components/user-management/components/user-details-modal
ng generate component components/user-management/components/user-edit-modal
ng generate component components/user-management/components/user-filters

# Create restaurant management sub-components
ng generate component components/restaurant-management/components/restaurant-table
ng generate component components/restaurant-management/components/restaurant-approval-modal
ng generate component components/restaurant-management/components/restaurant-details-modal
ng generate component components/restaurant-management/components/restaurant-documents-viewer
ng generate component components/restaurant-management/components/restaurant-filters

# Create delivery partner management sub-components
ng generate component components/delivery-partner-management/components/partner-table
ng generate component components/delivery-partner-management/components/partner-approval-modal
ng generate component components/delivery-partner-management/components/partner-details-modal
ng generate component components/delivery-partner-management/components/partner-documents-viewer
ng generate component components/delivery-partner-management/components/partner-performance

# Create order management sub-components
ng generate component components/order-management/components/order-table
ng generate component components/order-management/components/order-details-modal
ng generate component components/order-management/components/order-status-filter
ng generate component components/order-management/components/order-timeline
ng generate component components/order-management/components/order-items-list

# Create feedback management sub-components
ng generate component components/feedback-management/components/feedback-table
ng generate component components/feedback-management/components/feedback-details-modal
ng generate component components/feedback-management/components/feedback-response-modal
ng generate component components/feedback-management/components/feedback-analytics
ng generate component components/feedback-management/components/feedback-filters

# Create notification management sub-components
ng generate component components/notification-management/components/notification-table
ng generate component components/notification-management/components/create-notification-modal
ng generate component components/notification-management/components/notification-preview
ng generate component components/notification-management/components/notification-templates

# Create financial reports sub-components
ng generate component components/financial-reports/components/revenue-chart
ng generate component components/financial-reports/components/order-statistics
ng generate component components/financial-reports/components/restaurant-performance
ng generate component components/financial-reports/components/commission-report
ng generate component components/financial-reports/components/date-range-selector

# Create shared components
ng generate component shared/components/loading-spinner
ng generate component shared/components/confirmation-dialog
ng generate component shared/components/data-table
ng generate component shared/components/status-chip
ng generate component shared/components/chart-wrapper
ng generate component shared/components/page-header
ng generate component shared/components/search-filter
ng generate component shared/components/empty-state

# Create pipes
ng generate pipe shared/pipes/date-format
ng generate pipe shared/pipes/currency-format
ng generate pipe shared/pipes/truncate
ng generate pipe shared/pipes/safe-html
ng generate pipe shared/pipes/search-filter

# Create directives
ng generate directive shared/directives/auto-focus
ng generate directive shared/directives/click-outside
ng generate directive shared/directives/number-only

# Create services
ng generate service services/notification
ng generate service services/utils
ng generate service services/error-handler
ng generate service services/loading
ng generate service services/export
ng generate service services/websocket

# Create guards
ng generate guard guards/admin

# Create interceptors
ng generate interceptor interceptors/error
ng generate interceptor interceptors/loading

echo "✅ All components generated successfully!"
echo "📝 Next steps:"
echo "1. Update app.module.ts to include all new components"
echo "2. Update app-routing.module.ts with proper routes"
echo "3. Implement component logic and templates"
echo "4. Connect to backend APIs"
echo "5. Add proper styling and responsive design"