class Api::V1::EmployeesController < ShopifyApp::AuthenticatedController
  before_action :set_employee, only: [:show, :edit, :update, :destroy]
  before_action :confirm_store

  # GET /employees
  # GET /employees.json
  def index
    @employees = Employee.all
  end

  # GET /employees/1
  # GET /employees/1.json
  def show
  end

  # GET /employees/new
  def new
    @employee = Employee.new
  end

  # GET /employees/1/edit
  def edit

  end

  # POST /employees
  # POST /employees.json
  def create
    @employee = Employee.new(employee_params)

    respond_to do |format|
      if @employee.save
        format.html { redirect_to @employee, notice: 'Employee was successfully created.' }
        format.json { render :show, status: :created, location: @employee }
      else
        format.html { render :new }
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /employees/1
  # PATCH/PUT /employees/1.json
  def update
    @employee = Employee.find(params[:id])
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors.full_messages, status: 401
    end

  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    @employee.destroy
    respond_to do |format|
      format.html { redirect_to api_v1_employees_url, notice: 'Employee was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    def confirm_store
      if @employee.shop_id != @shop.id
        redirect_to root_path
      end
    end

    # Only allow a list of trusted parameters through.
    def employee_params
      params.require(:employee).permit(:name, :job_title, :description, :profile_url)
    end

end
