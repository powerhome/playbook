import React, { useState, useEffect } from "react"
import TextInput from '../../pb_text_input/_text_input'
import Button from "../../pb_button/_button"

// Emojis organized by category with icons for navigation and search names
const emojiCategories = [
    {
      id: 'recent',
      name: "Recent",
      icon: '🕒',
      emojis: [
        { emoji: '😀', name: 'happy' },
        { emoji: '👍', name: 'thumbs up' },
        { emoji: '🎉', name: 'popper' },
        { emoji: '❤️', name: 'heart' },
        { emoji: '🔥', name: 'fire' },
        { emoji: '✨', name: 'sparkles' }
      ]
    },
    {
      id: 'smileys',
      name: "Smileys",
      icon: '😊',
      emojis: [
        { emoji: '😀', name: 'happy' },
        { emoji: '😂', name: 'lmao' },
        { emoji: '🙂', name: 'smile' },
        { emoji: '😊', name: 'smiley' },
        { emoji: '😍', name: 'smile-heart' },
        { emoji: '🤩', name: 'star-struck' }
      ]
    },
    {
      id: 'people',
      name: "People",
      icon: '👥',
      emojis: [
        { emoji: '👍', name: 'thumbs up' },
        { emoji: '👎', name: 'thumbs down' },
        { emoji: '👌', name: 'OK' },
        { emoji: '👋', name: 'wave' },
        { emoji: '✌️', name: 'victory' },
        { emoji: '🙏', name: 'pray' }
      ]
    },
    {
      id: 'animals',
      name: "Animals",
      icon: '🐼',
      emojis: [
        { emoji: '🐶', name: 'dog' },
        { emoji: '🐱', name: 'cat' },
        { emoji: '🐼', name: 'panda' },
        { emoji: '🦁', name: 'lion' },
        { emoji: '🐢', name: 'turtle' },
        { emoji: '🦋', name: 'butterfly' }
      ]
    },
    {
      id: 'food',
      name: "Food",
      icon: '🍔',
      emojis: [
        { emoji: '🍎', name: 'apple' },
        { emoji: '🍕', name: 'pizza' },
        { emoji: '🍦', name: 'ice cream' },
        { emoji: '🍩', name: 'doughnut' },
        { emoji: '🍷', name: 'wine' },
        { emoji: '🍺', name: 'beer' }
      ]
    },
    {
      id: 'activities',
      name: "Activities",
      icon: '⚽',
      emojis: [
        { emoji: '⚽', name: 'soccer ball' },
        { emoji: '🏀', name: 'basketball' },
        { emoji: '🎮', name: 'video game' },
        { emoji: '🎬', name: 'clapper board' },
        { emoji: '🎨', name: 'artist palette' },
        { emoji: '🎭', name: 'performing arts' }
      ]
    },
    {
      id: 'travel',
      name: "Travel",
      icon: '✈️',
      emojis: [
        { emoji: '🚗', name: 'automobile' },
        { emoji: '✈️', name: 'airplane' },
        { emoji: '🚲', name: 'bicycle' },
        { emoji: '⛵', name: 'sailboat' },
        { emoji: '🏖️', name: 'beach' },
        { emoji: '🗽', name: 'Statue of Liberty' }
      ]
    },
    {
      id: 'symbols',
      name: "Symbols",
      icon: '🔣',
      emojis: [
        { emoji: '❤️', name: 'heart' },
        { emoji: '🔥', name: 'fire' },
        { emoji: '✨', name: 'sparkles' },
        { emoji: '💯', name: 'hundred' },
        { emoji: '⭐', name: 'star' },
        { emoji: '💪', name: 'flex' }
      ]
    }
  ]

  const TextInputEmojiPicker = (props) => {
    const [inputText, setInputText] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const [activeCategory, setActiveCategory] = useState('smileys')
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredEmojis, setFilteredEmojis] = useState([])
    const [recentEmojis, setRecentEmojis] = useState([
      { emoji: '😀', name: 'happy' },
      { emoji: '👍', name: 'thumbs up' },
      { emoji: '🎉', name: 'popper' },
      { emoji: '❤️', name: 'heart' },
      { emoji: '🔥', name: 'fire' },
      { emoji: '✨', name: 'sparkles' }
    ])

    // Handle emoji selection
    const handleEmojiClick = (emojiObj) => {
      setInputText(prevInput => prevInput + emojiObj.emoji)

      // Add to recent emojis
      if (!recentEmojis.some(item => item.emoji === emojiObj.emoji)) {
        const updatedRecent = [emojiObj, ...recentEmojis.slice(0, 5)]
        setRecentEmojis(updatedRecent)

        // Update the recent category
        const recentCategory = emojiCategories.find(cat => cat.id === 'recent')
        if (recentCategory) {
          recentCategory.emojis = updatedRecent
        }
      }

      // Uncomment to close picker after selection
      // setShowPicker(false)
    }

    // Handle search
    useEffect(() => {
      if (searchQuery.trim() === '') {
        setFilteredEmojis([])
        return
      }

      // Collect all emojis and filter based on search
      const allEmojis = emojiCategories.flatMap(category =>
        category.emojis.map(emojiObj => ({
          ...emojiObj,
          categoryName: category.name
        }))
      )

      // Search by emoji name or category
      const filtered = allEmojis.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setFilteredEmojis(filtered)
    }, [searchQuery])

    return (
      <div className="emoji-container">
        <div className="input-wrapper">
          <TextInput
              id="emoji-text-input"
              name="emojiPicker"
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter some emojis here"
              value={inputText}
              {...props}
          />
          <Button
              className="emoji-toggle-button"
              marginRight="lg"
              onClick={() => setShowPicker(!showPicker)}
              variant="link"
          >
            😊
          </Button>
        </div>

        {showPicker && (
          <div className="picker-wrapper">
            {/* Search Bar */}
            <TextInput
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emojis..."
                type="text"
                value={searchQuery}
                {...props}
            />

            {/* Category Navigation */}
            <div className="category-nav">
              {emojiCategories.map(category => (
                <button
                    className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setSearchQuery('')
                      document.getElementById(`category-${category.id}`)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    title={category.name}
                >
                  {category.icon}
                </button>
              ))}
            </div>

            {/* Emoji Content */}
            <div className="emoji-content">
              {searchQuery.trim() !== '' ? (
                // Search Results
                <div className="search-results">
                  <div className="category-title">Search Results</div>
                  {filteredEmojis.length > 0 ? (
                    <div className="emoji-grid">
                      {filteredEmojis.map((item, index) => (
                        <Button
                            className="emoji-button"
                            key={`search-${index}`}
                            onClick={() => handleEmojiClick(item)}
                            title={item.name}
                            variant="link"
                        >
                          {item.emoji}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="no-results">No emojis found</div>
                  )}
                </div>
              ) : (
                // All Categories
                <div className="all-categories">
                  {emojiCategories.map(category => (
                    <div
                        className="category-section"
                        id={`category-${category.id}`}
                        key={category.id}
                    >
                      <div className="category-title">
                        {category.name}
                      </div>
                      <div className="emoji-grid">
                        {category.emojis.map((emojiObj, index) => (
                          <Button
                              className="emoji-button"
                              key={`${category.id}-${index}`}
                              onClick={() => handleEmojiClick(emojiObj)}
                              title={emojiObj.name}
                              variant="link"
                          >
                            {emojiObj.emoji}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <style jsx>{`
          .emoji-container {
            font-family: Arial, sans-serif;
            max-width: 500px;
            position: relative;
          }

          .input-wrapper {
            display: flex;
            margin-bottom: 10px;
            position: relative;
          }

          .picker-wrapper {
            position: absolute;
            z-index: 100;
            margin-top: 5px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.1);
            width: 320px;
          }

          .search-container {
            margin-bottom: 12px;
          }

          .category-nav {
            display: flex;
            overflow-x: auto;
            padding-bottom: 8px;
            margin-bottom: 12px;
            border-bottom: 1px solid #eee;
          }

          .category-button {
            background: none;
            border: none;
            font-size: 18px;
            padding: 8px;
            cursor: pointer;
            margin-right: 4px;
            border-radius: 4px;
            min-width: 36px;
          }

          .category-button.active {
            background-color: #f0f0f0;
          }

          .emoji-content {
            max-height: 300px;
            overflow-y: auto;
            scroll-behavior: smooth;
          }

          .all-categories {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .category-section {
            padding-top: 8px;
            scroll-margin-top: 8px;
          }

          .category-title {
            font-weight: bold;
            margin-bottom: 8px;
            color: #555;
            font-size: 14px;
          }

          .emoji-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 2px;
          }

          .no-results {
            padding: 20px;
            text-align: center;
            color: #999;
          }
        `}</style>
      </div>
    );
  };

export default TextInputEmojiPicker
