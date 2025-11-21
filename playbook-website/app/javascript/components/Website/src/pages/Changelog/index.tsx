import { useLoaderData, useParams, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import { Flex, FlexItem, Background, Title, Nav, NavItem, SectionSeparator, Pagination } from "playbook-ui"

const Changelog = () => {
  const loaderData = useLoaderData() as any
  const { variant } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Determine which changelog to show (default to web)
  const activeVariant = variant || 'web'
  
  // Get the appropriate changelog data based on variant
  const getReleases = () => {
    switch (activeVariant) {
      case 'swift':
        return loaderData.swift_changelog_releases || []
      case 'figma':
        return loaderData.figma_changelog_releases || []
      default:
        return loaderData.changelog_releases || []
    }
  }

  const currentReleases = getReleases()

  // Reset to page 1 when variant changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeVariant])

  // Calculate pagination
  const totalPages = Math.ceil((currentReleases?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReleases = currentReleases?.slice(startIndex, endIndex) || []

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Flex orientation="column" align="center">
      <FlexItem className="minw0 w100">
        <Background
          display="flex"
          justifyContent="center"
          className="markdown w100"
          backgroundColor="white"
          paddingX="sm"
          paddingY="md"
        >
          <Background maxWidth="md" backgroundColor="white">
            <Title text="What's New" tag="h1" size={1} />
            <Nav orientation="horizontal">
              <NavLink to="/beta/changelog/web">
                <NavItem text="Web" active={activeVariant === 'web'} />
              </NavLink>
              <NavLink to="/beta/changelog/swift">
                <NavItem text="Swift" active={activeVariant === 'swift'} />
              </NavLink>
              <NavLink to="/beta/changelog/figma">
                <NavItem text="Figma" active={activeVariant === 'figma'} />
              </NavLink>
            </Nav>
            <SectionSeparator flexGrow={1} />
            <div className="markdown-content">
              {paginatedReleases.map((release: any, index: number) => (
                <ReactMarkdown key={index}>{release.content || ''}</ReactMarkdown>
              ))}
            </div>
            {totalPages > 1 && (
              <>
                <SectionSeparator marginY="md" />
                <Pagination
                  current={currentPage}
                  onChange={handlePageChange}
                  total={totalPages}
                  range={5}
                />
              </>
            )}

          </Background>
        </Background>
      </FlexItem>
    </Flex>
  )
}

export default Changelog
