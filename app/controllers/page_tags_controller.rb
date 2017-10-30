class PageTagsController < ApplicationController
  before_action :set_page_tag, only: [:show, :edit, :update, :destroy]

  # GET /page_tags
  # GET /page_tags.json
  def index
    @page_tags = PageTag.all
  end

  # GET /page_tags/1
  # GET /page_tags/1.json
  def show
  end

  # GET /page_tags/new
  def new
    if user_signed_in?
      @page_tag = PageTag.new
    else
      redirect_to root_path
    end
  end

  # GET /page_tags/1/edit
  def edit
    if user_signed_in?

    else
      redirect_to root_path
    end
  end

  # POST /page_tags
  # POST /page_tags.json
  def create
    @page_tag = PageTag.new(page_tag_params)

    respond_to do |format|
      if @page_tag.save
        format.html { redirect_to @page_tag, notice: 'Page tag was successfully created.' }
        format.json { render :show, status: :created, location: @page_tag }
      else
        format.html { render :new }
        format.json { render json: @page_tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /page_tags/1
  # PATCH/PUT /page_tags/1.json
  def update
    respond_to do |format|
      if @page_tag.update(page_tag_params)
        format.html { redirect_to @page_tag, notice: 'Page tag was successfully updated.' }
        format.json { render :show, status: :ok, location: @page_tag }
      else
        format.html { render :edit }
        format.json { render json: @page_tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /page_tags/1
  # DELETE /page_tags/1.json
  def destroy
    @page_tag.destroy
    respond_to do |format|
      format.html { redirect_to page_tags_url, notice: 'Page tag was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_page_tag
      @page_tag = PageTag.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def page_tag_params
      params.fetch(:page_tag, {})
    end
end
