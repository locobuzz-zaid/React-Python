from sqlalchemy import Integer, Column, SmallInteger, String, DateTime, Boolean, Numeric, ForeignKey
from .database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

class Blog(Base):
    __tablename__ = 'blogs'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))

    creator = relationship("User", back_populates="blogs")

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)

    blogs = relationship('Blog', back_populates="creator")


class Template(Base):
    __tablename__ = 'templates'

    template_id = Column(String(36), primary_key=True)
    template_name = Column(String(1000), nullable=False)
    template_description = Column(String(2000), nullable=True)
    user_id = Column(Integer, nullable=False, default=0)
    contains_sections = Column(Boolean, nullable=False, default=False)
    created_date = Column(DateTime, nullable=False)
    updated_date = Column(DateTime, nullable=True)
    is_forked = Column(Boolean, nullable=False, default=False)
    source_template = Column(String(50), nullable=True)
    is_shared = Column(Boolean, nullable=False, default=False)
    is_active = Column(Boolean, nullable=True)
    template_type = Column(String(5000), nullable=True)
    filters = Column(String(5000), nullable=True)
    hidden_filter = Column(String(1000), nullable=True)
    quick_filter = Column(String(500), nullable=True)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    brand_ids = Column(String(5000), nullable=True)
    brand_groups = Column(String(5000), nullable=True)
    is_locked = Column(Boolean, nullable=True)
    is_brand_locked = Column(Boolean, nullable=True)
    is_date_locked = Column(Boolean, nullable=True)
    comp_agg = Column(String(100), nullable=True)
    categorisation = Column(String(5000), nullable=True)
    saved_as = Column(String(150), nullable=True)
    Split_Template_by = Column(String, nullable=True)
    original_template_id = Column(String(50), nullable=True)
    template_access_type = Column(SmallInteger, nullable=False, default=0)
    unified_template_id = Column(String(36), nullable=True)
    related_templates = Column(String(500), nullable=True)
    template_name_on_tab = Column(String(500), nullable=True)
    s3_icon_link = Column(String(1000), nullable=True)
    
class Section(Base):
    __tablename__ = 'sections'

    section_id = Column(String(36), primary_key=True)
    template_id = Column(String(36), ForeignKey('templates.template_id'), nullable=False)
    section_name = Column(String(1000), nullable=True)
    section_description = Column(String(2000), nullable=True)
    hidden = Column(Boolean, nullable=False, default=False)
    filters = Column(String, nullable=True)  # nvarchar(MAX)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    brand_ids = Column(String(5000), nullable=True)
    brand_groups = Column(String, nullable=True)  # nvarchar(MAX)
    created_date = Column(DateTime, nullable=False)
    updated_date = Column(DateTime, nullable=True)
    sort_key = Column(Integer, nullable=False, default=0)
    is_locked = Column(Boolean, nullable=False, default=False)
    comp_brand_type = Column(Boolean, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)

class Widget(Base):
    __tablename__ = 'widgets'

    widget_id = Column(String(36), primary_key=True)
    template_id = Column(String(36), ForeignKey('templates.template_id'), nullable=True)
    section_id = Column(String(36), ForeignKey('sections.section_id'), nullable=True)
    widget_name = Column(String(1000), nullable=True)
    widget_description = Column(String(2000), nullable=True)
    graph_type = Column(String(500), nullable=True)
    type_ = Column(String(1000), nullable=True)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    brand_ids = Column(String(5000), nullable=True)
    sort_key = Column(Numeric(20, 8), nullable=True)
    is_locked = Column(Boolean, nullable=True)
    span = Column(String(100), nullable=True)
    original_widget_id = Column(String(36), nullable=True)
    is_imported = Column(Boolean, nullable=True)
    source_template = Column(String(36), nullable=True)
    tags = Column(String(5000), nullable=True)
    chart = Column(String, nullable=False)  # varchar(MAX)
    x_axis = Column(String, nullable=True)  # varchar(MAX)
    y_axes = Column(String, nullable=True)  # varchar(MAX)
    y_series = Column(String, nullable=False)  # varchar(MAX)
    brand_groups = Column(String(5000), nullable=True)
    filters = Column(String, nullable=True)  # nvarchar(MAX)
    widget_description_on_icon = Column(Boolean, nullable=True)
    data_source = Column(String(100), nullable=True)
    is_active = Column(Boolean, nullable=False)
    widget_Notes = Column(String, nullable=True)  # nvarchar(MAX)