class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  before_action :set_section

  # GET /categories
  # GET /categories.json
  def index
    @categories = Category.where(section: params[:section_id])

  end

  # GET /categories/1
  # GET /categories/1.json
  def show
    # No Longer Shown
    # @match_record = Page.where("category_id = ? AND lower(title) = ?", params[:id], @category.name.downcase).first
    # @first_record = Page.where(category: params[:id]).first
    # @cat_page_count = Page.where(category: params[:id]).count
    #
    # if @match_record.present?
    #   redirect_to category_page_path(@category, @match_record)
    # elsif @first_record.present?
    #   redirect_to category_page_path(@category, @first_record)
    # elsif @cat_page_count <= 0
    #   redirect_to new_category_page_path(@category)
    # end
  end

  # GET /categories/new
  def new
    # AUTHENTICATE A DIFFERENT WAY
    if user_signed_in?
      @category = Category.new
      @order_preset = nil
    else
      redirect_to root_path
    end
  end

  # GET /categories/1/edit
  def edit
    # AUTHENTICATE A DIFFERENT WAY
    if user_signed_in?
      @order_preset = @category.order
    else
      redirect_to root_path
    end
  end

  # POST /categories
  # POST /categories.json
  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        format.html { redirect_to section_category_path(@category.section_id, @category.id), notice: 'Category was successfully created.' }
        format.json { render :show, status: :created, location: @category }
      else
        format.html { render :new }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categories/1
  # PATCH/PUT /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to section_category_path(@category.section_id, @category.id), notice: 'Category was successfully updated.' }
        format.json { render :show, status: :ok, location: @category }
      else
        format.html { render :edit }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.json
  def destroy
    @category.destroy
    respond_to do |format|
      format.html { redirect_to categories_url, notice: 'Category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_section
      @current_section = Section.find(params[:section_id])
      @section = @current_section
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def category_params
      params.require(:category).permit(:name, :order, :section_id)
    end
end
