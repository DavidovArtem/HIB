package com.project.search;

import com.project.model.BookDTO;
import com.project.model.LocaleString;
import com.project.service.abstraction.BookService;
import lombok.AllArgsConstructor;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
@AllArgsConstructor
public class BookSearch {

    @PersistenceContext
    private final EntityManager entityManager;

    private final BookService bookService;

    public List<BookDTO> search(String req, String locale) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        QueryBuilder queryBuilder = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(LocaleString.class).get();
        Query query = queryBuilder.keyword().fuzzy().withEditDistanceUpTo(1).withPrefixLength(0)
                .onField(locale).matching(req).createQuery();

        FullTextQuery jpaQuery = fullTextEntityManager.createFullTextQuery(query, LocaleString.class);
        List<LocaleString> results = jpaQuery.getResultList();
        List<BookDTO> result = new ArrayList<>();

        for (LocaleString localeString : results) {
            BookDTO bookDTO20 = bookService.getBookBySearchRequest(localeString, locale);
            if (bookDTO20 != null) {
                result.add(bookDTO20);
            }
        }
        return result;
    }
}
