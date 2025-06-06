export const config = {
  siteName: "notes",
  files_list_page_size: 100,
  search_result_list_page_size: 100,
  enable_cors_file_down: false,
  enable_password_file_verify: false,
  direct_link_protection: false,
  disable_anonymous_download: false,
  file_link_expiry: 7,
  search_all_drives: true,
  enable_login: false,
  roots: [
    {
      id: "root",
      name: "notes",
      protect_file_link: false
    }
  ]
};

export const uiConfig = {
  theme: "darkly",
  version: "2.3.6",
  logo_image: true,
  logo_height: "",
  logo_width: "50px",
  favicon: "https://cdn.jsdelivr.net/npm/@googledrive/index@2.2.3/images/favicon.ico",
  logo_link_name: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-cloudflare-provides-content-delivery-network-services-ddos-mitigation-logo-color-tal-revivo.png",
  fixed_header: true,
  header_padding: "80",
  nav_link_1: "Home",
  nav_link_3: "Current Path",
  nav_link_4: "Contact",
  fixed_footer: false,
  hide_footer: true,
  header_style_class: "navbar-dark bg-primary",
  css_a_tag_color: "white",
  css_p_tag_color: "white",
  folder_text_color: "white",
  loading_spinner_class: "text-light",
  search_button_class: "btn btn-danger",
  path_nav_alert_class: "alert alert-primary",
  file_view_alert_class: "alert alert-danger",
  file_count_alert_class: "alert alert-secondary",
  contact_link: "https://telegram.dog/ImmaKakarot",
  company_name: "MITAoE Notes",
  company_link: "https://github.com/mitaoe",
  credit: true,
  display_size: true,
  display_time: false,
  display_download: true,
  disable_player: false,
  disable_video_download: false,
  allow_selecting_files: true
}; 