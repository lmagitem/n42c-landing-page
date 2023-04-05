use actix_files::{Files, NamedFile};
use actix_service::Service;
use actix_web::http::header::HeaderValue;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpRequest, HttpServer, Result};
use chrono::Local;
use fern::{Dispatch, log_file};
use log::LevelFilter;
use std::path::PathBuf;

async fn serve_static(req: HttpRequest) -> Result<NamedFile> {
    let path: PathBuf = req.match_info().query("tail").parse().unwrap();
    let mime = mime_guess::from_path(&path).first_or_octet_stream();
    Ok(NamedFile::open(path)?.set_content_type(mime))
}

async fn index() -> Result<NamedFile> {
    let path: PathBuf = "./static/index.html".into();
    Ok(NamedFile::open(path)?)
}

async fn serve_robots_txt() -> Result<NamedFile> {
    let path: PathBuf = "./static/robots.txt".into();
    Ok(NamedFile::open(path)?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");

    let base_config = Dispatch::new()
        .level(LevelFilter::Info)
        .chain(std::io::stdout())
        .chain(
            log_file("actix-web.log").expect("Failed to create log file"),
        );

    let config = Dispatch::new()
        .format(move |out, message, record| {
            out.finish(format_args!(
                "{} [{}] {}",
                Local::now().format("[%Y-%m-%d %H:%M:%S]"),
                record.level(),
                message
            ))
        })
        .chain(base_config);

    config.apply().expect("Failed to set up logging");

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap_fn(|mut req, srv| {
                let headers = req.headers_mut();
                headers.insert(
                    actix_web::http::header::CONTENT_SECURITY_POLICY,
                    HeaderValue::from_static(
                        "frame-ancestors 'self'; frame-src https://www.youtube.com",
                    ),
                );
                let fut = srv.call(req);
                async move { Ok(fut.await?) }
            })
            .route("/", web::get().to(index))
            .route("/{year}/{month}/{day}/{path}", web::get().to(index))
            .route("/{year}/{month}/{day}/{path}/", web::get().to(index))
            .route("/robots.txt", web::get().to(serve_robots_txt))
            .service(
                Files::new("/static", "static")
                    .prefer_utf8(true)
                    .default_handler(web::get().to(serve_static)),
            )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
