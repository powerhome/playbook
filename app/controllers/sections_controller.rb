class SectionsController < ApplicationController
  before_action :set_section, only: [:show, :edit, :update, :destroy]
  skip_before_action :authenticate_user!, only: [:show, :index]

  # GET /sections
  # GET /sections.json
  def index
    @sections = Section.all
  end

  # GET /sections/1
  # GET /sections/1.json
  def show
    # @section_first_record = Category.where(section: params[:id]).first
    # if @section_first_record.present?
    #   redirect_to section_category_path(@section, @section_first_record)
    # end
  end

  # GET /sections/new
  def new
    @section = Section.new
  end

  # GET /sections/1/edit
  def edit
  end

  # POST /sections
  # POST /sections.json
  def create
    @section = Section.new(section_params)

    respond_to do |format|
      if @section.save
        format.html { redirect_to @section, notice: 'Section was successfully created.' }
        format.json { render :show, status: :created, location: @section }
      else
        format.html { render :new }
        format.json { render json: @section.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sections/1
  # PATCH/PUT /sections/1.json
  def update
    respond_to do |format|
      if @section.update(section_params)
        format.html { redirect_to @section, notice: 'Section was successfully updated.' }
        format.json { render :show, status: :ok, location: @section }
      else
        format.html { render :edit }
        format.json { render json: @section.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sections/1
  # DELETE /sections/1.json
  def destroy
    @section.destroy
    respond_to do |format|
      format.html { redirect_to sections_url, notice: 'Section was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def global_var_setup
      @current_section = Section.find(params[:id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_section
      @current_section = Section.find(params[:id])
      @section = Section.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def section_params
      params.require(:section).permit(:name)
    end
end
