public List<Tag> obterIniciamPor(String caracteres) {
    String query =
        "SELECT id, nome " +
        "FROM Tags " +
        "WHERE nome LIKE :filtro";

    try (Connection con = db.open()) {
        return con.createQuery(query)
            .addParameter("filtro", caracteres + "%")
            .executeAndFetch(Tag.class);
    }
}
